export interface Terms {
  name: string
}

export interface Props {
  relatedTerms: Terms[]
  setRelatedTerms?: (content: Terms[]) => void
  isRelatedTermsEmpty?: boolean
}
