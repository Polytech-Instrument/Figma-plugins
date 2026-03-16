export type Variant = {
    sku: string;
    specs?: string;
    min?: string;
    qty?: string;
    price?: string;
    discount?: string;
};

export type Group = {
    headerName: string;
    descriptionText?: string;
    imageBytes?: Uint8Array | null;
    discountText?: string | null;
    discountInfoText?: string | null;
    mainSku?: string | null;
    brandId?: string | null;
    items: Variant[];
};

export type InfoEntry = {
    discount?: string;
    price?: string;
    conditions?: string;
};

export type InfoMap = Record<string, InfoEntry>;

