export interface Artist {
    id: number
    name: string
    image: string
    listeners: number
    mbid: string
    url: string
    }
    
    export interface ArtistResource {
    id: number
    name: string
    mbid: string
    listeners: number
    image: [
    ImageUrl //maybe any
    
    ]
    
    }
    
    interface ImageUrl {
    '#text': string
    
    }   