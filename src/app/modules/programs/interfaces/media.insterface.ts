export interface Media {
    ok:    boolean;
    media: MediaElement[];
    total: number;
}

export interface MediaElement {
    type:    string;
    fileUrl: string;
    id:      string;
}
