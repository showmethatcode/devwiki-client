import { css } from '@emotion/react'

export const inputTitleStyle = css`
  font-family: Pretendard;
  font-style: normal;
  background-color: #fcfcfc;
  border: 1px solid #efefef;
  padding: 0 16px;
  font-size: 14px;
  width: 96%;
  height: 52px;
  margin-bottom: 28px;
`

export const inputTitleInEditModeStyle = css`
  font-family: Pretendard;
  font-style: normal;
  background-color: #fcfcfc;
  border: 1px solid #efefef;
  padding: 0 16px;
  font-size: 14px;
  width: 96%;
  height: 52px;
  margin-bottom: 28px;
  &:focus {
    outline: none;
  }
`

export const listContainerStyle = css`
  width: 100%;
  overflow-x: scroll;
  padding-bottom: 30px;
`

export const listTermsStyle = css`
  width: 100%;
  padding: 0;
`

export const textInputStyle = css`
  background-color: #fcfcfc;
  border: 1px solid #efefef;
  padding: 0 16px;
  font-size: 14px;
  width: 364px;
  height: 52px;
`

export const relatedTermsStyle = css`
  padding: 8px 12px;
  float: left;
  border-radius: 18px;
  font-weight: 500;
  min-width: fit-content;
  margin: 5px 5px 0px 0px;
  color: white;
  background-color: #7d68ff;
  list-style: none;
`

export const buttonInRelatedTermsStyle = css`
  margin-left: 5px;
  background-color: transparent;
  color: yellow;
  border: 0;
  outline: 0;
`

export const submitButtonStyle = css`
  float: right;
  background-color: #654bff;
  border: none;
  font-size: 18px;
  color: white;
  border-radius: 10px;
  padding: 18px 36.5px;
`

export const submitButtonNotReadyStyle = css`
  float: right;
  background-color: gray;
  border: none;
  font-size: 18px;
  color: white;
  border-radius: 10px;
  padding: 18px 36.5px;
`

export const Error = css`
  color: #e01e5a;
  margin: 8px 0 16px;
  font-weight: bold;
`
