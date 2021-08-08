import { css } from '@emotion/react'
import Link from 'next/link'
import ArrowIcon from './ArrowIcon'

const rootStyle = css`
  height: 66px;
  border: 1px solid #f4f4f4;
`

const toolbarStyle = css`
  padding: 0px;
  display: flex;
  justify-content: space-around;
  margin: 20px 0 20px 0;
`

const titleWrapperStyle = css`
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;
  color: #292929;
  cursor: pointer;
  letter-spacing: -0.03em;
`

const newTermButtonStyle = css`
  font-weight: 600;
  font-size: 16px;
  color: #474747;
  margin-right: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const newTermButtonWrapperStyle = css`
  cursor: pointer;
`

const Header = () => {
  return (
    <>
      <header css={rootStyle}>
        <nav css={toolbarStyle}>
          <Link href="/">
            <div css={titleWrapperStyle}>🤞개발용어사전</div>
          </Link>
          <Link href="/terms/new">
            <div css={newTermButtonWrapperStyle}>
              <button css={newTermButtonStyle}>새로운 용어 추가하기</button>
              <ArrowIcon />
            </div>
          </Link>
        </nav>
      </header>
    </>
  )
}

export default Header
