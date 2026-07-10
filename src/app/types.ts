export type Variant = {
    sku: string;
    specs?: string;
    min?: string;
    qty?: string;
    price?: string;
    discount?: string;
    boxPrice?: string;
    multiplicity?: string;
    boxQty?: string;
    boxNotice?: string;
    productUrl?: string | null;
};

export type Group = {
    cardType?: "default" | "box";
    headerName: string;
    descriptionText?: string;
    imageBytes?: Uint8Array | null;
    discountText?: string | null;
    discountInfoText?: string | null;
    surpriseText?: string | null;
    boxPriceText?: string | null;
    multiplicityText?: string | null;
    boxQtyText?: string | null;
    boxNoticeText?: string | null;
    videoUrl?: string | null;
    productUrl?: string | null;
    mainSku?: string | null;
    brandId?: string | null;
    leafletName?: string | null;
    items: Variant[];
};

export type InfoEntry = {
    discount?: string;
    price?: string;
    conditions?: string;
    surpriseText?: string;
    leafletName?: string;
    boxPrice?: string;
    multiplicity?: string;
    boxQty?: string;
    boxNotice?: string;
};

export type InfoMap = Record<string, InfoEntry>;
