export interface Terms {
  name: string
}

export interface Term {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  related: { id: number; name: string }[]
}

export interface Props {
  relatedTerms: Terms[]
  setRelatedTerms?: (content: Terms[]) => void
  isRelatedTermsEmpty?: boolean
}

export interface DetailTermProps {
  id: number
}

export interface RelatedTerm {
  id: number
  text: string
}

export interface Response {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  termRelatedNames: { id: number; name: string }[]
}
