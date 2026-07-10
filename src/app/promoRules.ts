// Сюда можно дописывать правила сведения подкатегорий к главным категориям.
// Левая часть ищется в названии категории из таблицы, правая попадет в баннер.
export const MAIN_CATEGORY_RULES: Array<{ match: string; title: string }> = [
    { match: "абразив", title: "Абразивный инструмент" },
    { match: "автомобиль", title: "Автоинструмент" },
    { match: "измер", title: "Измерительный инструмент" },
    { match: "лестниц", title: "Лестницы" },
    { match: "перчат", title: "Перчатки" },
    { match: "скоб", title: "Скобяные изделия" },
    { match: "слесар", title: "Слесарный инструмент" },
    { match: "столяр", title: "Столярный инструмент" },
    { match: "хозяй", title: "Хозяйственный инструмент" },
    { match: "шлиф", title: "Шлифовальный инструмент" },
    { match: "штукатур", title: "Штукатурный инструмент" }
];

export function resolveMainCategory(rawName: string): string {
    const name = String(rawName || "").replace(/\s+/g, " ").trim();
    const key = name.toLowerCase();
    const rule = MAIN_CATEGORY_RULES.find(item => key.includes(item.match.toLowerCase()));
    return rule ? rule.title : name;
}
