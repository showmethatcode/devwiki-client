import { css } from '@emotion/react'
import { FC } from 'react'
import { AppBar, Toolbar, Box, ButtonBase, Link } from '@material-ui/core'
import Image from 'next/image'
import arrowImgSrc from './arrow.png'

const rootStyle = css`
  width: 1440px;
  height: 66px;
  border: 1px solid #f4f4f4;
`

const toolbarStyle = css`
  padding: 0px;
  display: flex;
  justify-content: space-around;
`

const titleStyle = css`
  font-family: Pretendard;
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;
  color: #292929;
`

const newTermButtonWrapperStyle = css``

const newTermButtonStyle = css`
  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  color: #474747;
  margin-right: 5px;
`

const Header: FC = () => {
  return (
    <>
      <AppBar
        css={rootStyle}
        position="static"
        component="header"
        color="transparent"
        elevation={0}
      >
        <Toolbar css={toolbarStyle} disableGutters={true}>
          <Box css={titleStyle}>🤞개발용어사전</Box>
          <Link style={{ textDecoration: 'none' }} href="/">
            <ButtonBase css={newTermButtonWrapperStyle}>
              <p css={newTermButtonStyle}>새로운 용어 추가하기</p>
              <Image src={arrowImgSrc} />
            </ButtonBase>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
