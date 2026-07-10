<?php
define("STOP_STATISTICS", true);
define("NO_KEEP_STATISTIC", true);
define("NO_AGENT_CHECK", true);
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

use Bitrix\Main\Context;
use Bitrix\Main\Loader;

$request = Context::getCurrent()->getRequest();
$IBLOCK_ID = 26;

function finishJson($payload, $statusCode = 200) {
    global $APPLICATION;
    $APPLICATION->RestartBuffer();
    http_response_code($statusCode);
    header("Content-Type: application/json; charset=utf-8");
    header("Access-Control-Allow-Origin: *");
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    die();
}

function normalizeArticles($raw) {
    if (is_array($raw)) {
        $values = $raw;
    } else {
        $text = trim((string)$raw);
        if ($text === "") return [];

        $decoded = json_decode($text, true);
        if (is_array($decoded)) {
            $values = $decoded;
        } else {
            $values = preg_split('/[\s,;]+/u', $text, -1, PREG_SPLIT_NO_EMPTY);
        }
    }

    $result = [];
    foreach ($values as $value) {
        $sku = trim((string)$value);
        if ($sku !== "") $result[$sku] = $sku;
    }
    return array_values($result);
}

function absoluteImageUrl($imageId) {
    if (!$imageId) return null;
    $path = CFile::GetPath($imageId);
    if (!$path) return null;

    $protocol = (\CMain::IsHTTPS()) ? "https://" : "http://";
    return $protocol . $_SERVER["HTTP_HOST"] . $path;
}

try {
    if (!Loader::includeModule("iblock")) {
        throw new Exception("Модуль iblock не установлен");
    }

    if ($request->isPost()) {
        $body = file_get_contents("php://input");
        $json = json_decode($body, true);
        $articlesRaw = $json["articles"] ?? $request->getPost("articles") ?? $request->getPost("article");
    } else {
        $articlesRaw = $request->getQuery("articles") ?? $request->getQuery("article");
    }

    $articles = normalizeArticles($articlesRaw);
    if (count($articles) === 0) {
        throw new Exception("Не переданы articles или article");
    }

    $or = ["LOGIC" => "OR"];
    foreach ($articles as $article) {
        $or[] = ["ID" => $article];
        $or[] = ["=XML_ID" => $article];
        $or[] = ["=PROPERTY_ARTNUMBER" => $article];
        $or[] = ["=PROPERTY_CML2_ARTICLE" => $article];
        $or[] = ["=PROPERTY_ARTICLE" => $article];
        $or[] = ["=CODE" => $article];
    }

    $arFilter = [
        "IBLOCK_ID" => $IBLOCK_ID,
        "ACTIVE" => "Y",
        $or
    ];
    $arSelect = [
        "ID",
        "NAME",
        "CODE",
        "XML_ID",
        "PREVIEW_PICTURE",
        "DETAIL_PICTURE",
        "PROPERTY_ARTNUMBER",
        "PROPERTY_CML2_ARTICLE",
        "PROPERTY_ARTICLE"
    ];

    $data = [];
    $matched = [];
    $res = CIBlockElement::GetList([], $arFilter, false, false, $arSelect);
    while ($row = $res->Fetch()) {
        $aliases = [
            (string)$row["ID"],
            (string)$row["XML_ID"],
            (string)$row["CODE"],
            (string)$row["PROPERTY_ARTNUMBER_VALUE"],
            (string)$row["PROPERTY_CML2_ARTICLE_VALUE"],
            (string)$row["PROPERTY_ARTICLE_VALUE"]
        ];
        $imageId = $row["DETAIL_PICTURE"] ?: $row["PREVIEW_PICTURE"];
        $payload = [
            "image" => absoluteImageUrl($imageId),
            "id" => $row["ID"],
            "name" => $row["NAME"]
        ];

        foreach ($aliases as $alias) {
            $alias = trim($alias);
            if ($alias === "" || !in_array($alias, $articles, true)) continue;
            if (!isset($data[$alias])) $data[$alias] = $payload;
            $matched[$alias] = true;
        }
    }

    $missing = [];
    foreach ($articles as $article) {
        if (empty($matched[$article])) $missing[] = $article;
    }

    finishJson([
        "status" => "success",
        "count" => count($data),
        "requested" => count($articles),
        "data" => $data,
        "missing" => $missing
    ]);
} catch (Exception $e) {
    finishJson([
        "status" => "error",
        "message" => $e->getMessage(),
        "data" => new stdClass(),
        "missing" => []
    ], 500);
}
