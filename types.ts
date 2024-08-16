export type LostItem = {
    id: string
    title: string
    description: string
    date_lost: string
    location: string
    status: 'open' | 'found' | 'closed'
    is_official_document: boolean
  }