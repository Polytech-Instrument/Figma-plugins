export const COMMON_PROMO_TITLES = [
    "Выгодная акция месяца",
    "Лучшие предложения месяца",
    "Месяц выгодных покупок",
    "Инструменты по акции",
    "Акционные товары месяца",
    "Выгода на нужные товары",
    "Спецпредложения месяца",
    "Больше выгоды в каталоге",
    "Подборка акционных товаров",
    "Практичная выгода месяца"
];

export const FIXED_PROMO_TITLES = [
    "Фиксированные цены месяца",
    "Цены зафиксированы",
    "Фикс-акция месяца",
    "Стабильная цена на товары",
    "Товары по фиксированной цене"
];

export const BOX_PROMO_TITLE = "Акция коробкой дешевле!";

export function choosePromoTitle(type: "common" | "fixed" | "box", seed: string): string {
    if (type === "box") return BOX_PROMO_TITLE;
    const titles = type === "fixed" ? FIXED_PROMO_TITLES : COMMON_PROMO_TITLES;
    const index = Math.abs(hashText(seed)) % titles.length;
    return titles[index];
}

function hashText(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        hash = ((hash << 5) - hash) + value.charCodeAt(i);
        hash |= 0;
    }
    return hash;
}
