import { css } from '@emotion/react'
import { FC } from 'react'

const rootStyle = css`
  background-color: #fafafa;
  margin: 40px 0 40px 0;
  padding: 10px 10px 10px 10px;
  display: flex;
  align-items: center;
`

const headerContentStyle = css`
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 27px;
  margin: 0 17px 0 17px;
`

const articleStyle = css`
  p,
  span,
  div {
    margin: auto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 27px;
  }
`

enum EmojiTypes {
  dog = '🐶',
  cat = '😺',
  devil = '😈',
  robbot = '🤖',
  ghost = '👻',
  eyes = '👀',
  bad = '💩',
  good = '👍',
  lol = '🙌',
  thanks = '🙏',
  whale = '🐳',
  monkey = '🐵',
  fox = '🦊',
  bear = '🐻',
  chick = '🐥',
  car = '🚙',
  rocket = '🚀',
  party = '🎉',
  letter = '📮',
}

interface EmojiContentBoxProps {
  emoji: keyof typeof EmojiTypes
}

const EmojiContentBox: FC<EmojiContentBoxProps> = ({ emoji, children }) => {
  return (
    <>
      <section css={rootStyle}>
        <header>
          <p css={headerContentStyle}>{EmojiTypes[emoji]}</p>
        </header>
        <article css={articleStyle}>{children}</article>
      </section>
    </>
  )
}

export default EmojiContentBox
