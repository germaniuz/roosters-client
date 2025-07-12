export type MobileNavigationItem = {
    label: string;
    path: string;
    icon: string;
    badge?: ComputedRef<number>;
    isLink?: boolean;
};
