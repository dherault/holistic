import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  A,
  Button,
  Div,
  Footer,
  H1,
  H2,
  IconButton,
  P,
  Section,
  Span,
} from 'honorable'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import highlighterStyleLight from 'react-syntax-highlighter/dist/esm/styles/prism/material-light'
import highlighterStyleDark from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark'
import { AiFillGithub } from 'react-icons/ai'

import Showcase from '../components/Showcase'
import ThemeSwitch from '../components/ThemeSwitch'
import CommandLinePre from '../components/CommandLinePre'
import ShowcaseContext from '../contexts/ShowcaseContext'
import ThemeModeContext from '../contexts/ThemeModeContext'

SyntaxHighlighter.registerLanguage('jsx', jsx)

function Home() {
  const [showcase, setShowcase] = useState('default')
  const showcaseValue = useMemo(() => [showcase, setShowcase], [showcase])

  return (
    <ShowcaseContext.Provider value={showcaseValue}>
      <Div
        xflex="x4s"
        maxWidth="100vw"
      >
        <Div
          elevation={1}
          flexGrow={1}
          flexShrink={1}
          zIndex={10}
          position="relative"
        >
          <ScrollListener showcase="default">
            <HeroSection />
          </ScrollListener>
          <ScrollListener showcase="productCard">
            <DemoSection />
          </ScrollListener>
          <ScrollListener showcase="design">
            <DesignSection />
          </ScrollListener>
          <ScrollListener showcase="docs">
            <ThemeDocsSection />
          </ScrollListener>
          <FooterSection />
        </Div>
        <Div
          position="relative"
          flexBasis="calc(100vh * 3 / 4)"
          flexShrink={1}
          backgroundColor="background-light"
        >
          <Div
            position="sticky"
            top={0}
            right={0}
            width="100%"
            height="100vh"
          >
            <Showcase />
            <ThemeSwitch
              position="absolute"
              right="2rem"
              top="2rem"
            />
            <Div
              xflex="x6"
              position="absolute"
              bottom="2rem"
              right="2rem"
            >
              <A
                href="https://docs.honorable.design"
                target="_blank"
                rel="noopener noreferrer"
              >
                Docs
              </A>
              <IconButton
                variant="ghost"
                as="a"
                display="flex"
                color="text-light"
                ml={1}
                mr={-0.5}
                my={-0.5}
                cursor="pointer"
                href="https://github.com/dherault/honorable"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub
                  color="inherit"
                  size={24}
                />
              </IconButton>
            </Div>
          </Div>
        </Div>
      </Div>
    </ShowcaseContext.Provider>
  )
}

// https://stackoverflow.com/questions/487073/how-to-check-if-element-is-visible-after-scrolling
function isScrolledIntoView(element) {
  const rect = element.getBoundingClientRect()
  const elementTop = rect.top
  const elementBottom = rect.bottom

  return elementTop >= 0 && elementBottom <= window.innerHeight
}

function ScrollListener({ showcase, children }) {
  const scrolledRef = useRef()
  const [, setShowcase] = useContext(ShowcaseContext)

  useEffect(() => {
    function handleScroll() {
      if (isScrolledIntoView(scrolledRef.current)) {
        setShowcase(showcase)
      }
    }

    document.addEventListener('scroll', handleScroll)

    return () => document.removeEventListener('scroll', handleScroll)
  }, [showcase, setShowcase])

  return (
    <Div
      position="relative"
      flexShrink={1}
    >
      {children}
      <Div
        ref={scrolledRef}
        position="absolute"
        top="50%"
        right={0}
      />
    </Div>
  )
}

function HeroSection() {
  return (
    <Section
      p={2}
      xflex="y5"
      height="100vh"
    >
      <Div
        mt={-8}
        xflex="y2s"
      >
        <H1>
          <Span
            xflex="x5"
            display="inline-flex"
            borderRadius={24}
            overflow="hidden"
            mb={1}
          >
            🙏
          </Span>
          <br />
          Implement any
          <br />
          <Span
            background="linear-gradient(45deg, primary, lighten(primary, 10))"
            backgroundClip="text"
            webkitTextFillColor="transparent"
          >
            Design System
          </Span>
          <br />
          in React
        </H1>
        <Div
          xflex="x4s"
          mt={2}
        >
          <A
            href="https://docs.honorable.design/quick-start"
            target="_blank"
            rel="noreferer noopener"
          >
            <Button size="large">
              Get Started
            </Button>
          </A>
          <CommandLinePre
            ml={2}
            flexGrow={1}
            maxWidth={360}
          >
            npm i --save honorable @emotion/react @emotion/styled
          </CommandLinePre>
        </Div>
      </Div>
    </Section>
  )
}

const createCode = code => `import { Article, Button, Div, H2, Img, P, Span } from 'honorable'

function ProductCard({ product = {} }) {
  return (${code}
  )
}`

const codeText = `
    <Article
      padding="2rem"
      borderRadius={4}
      maxWidth={512}
      display="flex"
      backgroundColor="background"  // This is a color variable
      elevation={1}                 // This is a global customProps
    >
      <Img
        marginTop="1rem"
        src={product.imageUrl}
        width="45%"
        alt="product"
      />
      <Div
        marginLeft="2rem"
        display="flex"
        flexDirection="column"
      >
        <H2 textAlign="center">
          {product.name}
        </H2>
        <P marginTop="1rem">
          {product.description}
        </P>
        <P
          marginTop="0.5rem"
          display="flex"
          alignItems="center"
        >
          Color:
          <Span
            display="inline-block"
            width={16}
            height={16}
            borderRadius={2}
            marginLeft="0.5rem"
            backgroundColor={product.color}
          />
        </P>
        <Div flexGrow={1} />
        <Div
          marginTop="1rem"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <P fontWeight="bold">
            {product.price}
          </P>
          <Button marginLeft="1rem">
            Buy
          </Button>
        </Div>
      </Div>
    </Article>`

const codeTextShorthands = `
    <Article
      p={2}
      borderRadius={4}
      maxWidth={512}
      xflex="x4s"
      backgroundColor="background"  // This is a color variable
      elevation={1}                 // This is a global customProps
      >
      <Img
        mt={1}
        src={product.imageUrl}
        width="45%"
        alt="product"
      />
      <Div
        ml={1}
        xflex="y2s"
      >
        <H2 textAlign="center">
          {product.name}
        </H2>
        <P mt={1}>
          {product.description}
        </P>
        <P
          mt={0.5}
          xflex="x4"
        >
          Color:
          <Span
            display="inline-block"
            width={16}
            height={16}
            borderRadius={2}
            ml={0.5}
            backgroundColor={product.color}
          />
        </P>
        <Div flexGrow={1} />
        <Div
          mt={1}
          xflex="x6"
        >
          <P fontWeight="bold">
            {product.price}
          </P>
          <Button ml={1}>
            Buy
          </Button>
        </Div>
      </Div>
    </Article>`

function DemoSection() {
  const [themeMode] = useContext(ThemeModeContext)
  const [isShorthands, setIsShorthands] = useState(false)

  const highlighterStyle = themeMode === 'dark' ? highlighterStyleDark : highlighterStyleLight
  const customHighlighterStyle = {
    ...highlighterStyle,
    'code[class*="language-"]': {
      ...highlighterStyle['code[class*="language-"]'],
      background: 'transparent',
    },
    'pre[class*="language-"]': {
      ...highlighterStyle['pre[class*="language-"]'],
      background: 'transparent',
    },
  }

  return (
    <Section
      py={2}
      px={4}
      xflex="y5s"
      height="100vh"
    >
      <Div flexShrink={0}>
        <H2
          textAlign="center"
        >
          HTML tags as base components, CSS as props
        </H2>
      </Div>
      <Div
        mt={3}
        p={1}
        height={727}
        flexShrink={0}
        backgroundColor="background-light"
        border="1px solid border"
        borderRadius={4}
        overflowY="scroll"
      >
        <SyntaxHighlighter
          language="jsx"
          style={customHighlighterStyle}
          customStyle={{
            fontSize: '14px',
            margin: 0,
            padding: 0,
          }}
        >
          {createCode(isShorthands ? codeTextShorthands : codeText)}
        </SyntaxHighlighter>
      </Div>
      <Div
        mt={0.5}
        xflex="x6"
        flexShrink={0}
      >
        {isShorthands && (
          <A
            as={Link}
            to="/xflex"
            userSelect="none"
          >
            How does xflex work?
          </A>
        )}
        <A
          ml={1}
          userSelect="none"
          onClick={() => setIsShorthands(x => !x)}
        >
          {isShorthands ? 'Use pure CSS syntax' : 'Use shorthands!'}
        </A>
      </Div>
    </Section>
  )
}

function DesignSection() {
  return (
    <Section
      py={8}
      px={4}
    >
      <H2
        pt={2}
        textAlign="center"
      >
        Designed to create fast, accessible React apps
      </H2>
      <DesignSectionItem
        icon="0️⃣"
        action={(
          <A userSelect="none">
            Show me how to create my own conventions!
          </A>
        )}
        mt={3}
      >
        Honorable's props are convention-free by default, <br />which means a 0 learning curve for developers that already know CSS.
      </DesignSectionItem>
      <DesignSectionItem
        icon="🔧"
        action={(
          <A userSelect="none">
            Display what a cool theme looks like!
          </A>
        )}
        mt={3}
      >
        The theming API is simple, composable and inheritable.
      </DesignSectionItem>
      <DesignSectionItem
        icon="🫡"
        action={(
          <A userSelect="none">
            Amaze me with a fully keyboard accessible component!
          </A>
        )}
        mt={3}
      >
        Full keyboard navigation, managed focus, WAI-ARIA compliant.
      </DesignSectionItem>
      <DesignSectionItem
        icon="📱"
        action={(
          <A userSelect="none">
            Pop out some small-screens code!
          </A>
        )}
        mt={3}
      >
        Mobile-ready and responsive by nature.
      </DesignSectionItem>
    </Section>
  )
}

function DesignSectionItem({ children, icon = '👉', action = '', ...props }) {
  return (
    <Div
      xflex="x1s"
      text="large"
      {...props}
    >
      <Span>
        {icon}
      </Span>
      <P ml={1}>
        {children}
        <Span
          text="normal"
          display="block"
          mt={1.5}
        >
          {action}
        </Span>
      </P>
    </Div>
  )
}

function ThemeDocsSection() {
  return (
    <Section
      py={8}
      px={4}
      height="100vh"
      xflex="y1s"
    >
      <H2
        pt={2}
        textAlign="center"
      >
        Document your design system easily
      </H2>
      <P
        mt={3}
        text="large"
      >
        Honorable has a utility to convert your theme into usable documentation.
      </P>
      <P
        text="large"
        mt={0.5}
      >
        Perfect for teams. 👌
      </P>
      <CommandLinePre mt={3}>
        npx honorable-documentation ./src/theme.js --out ./DesignSystem.md
      </CommandLinePre>
    </Section>
  )
}

function FooterSection() {
  return (
    <Footer
      mt={6}
      py={2}
      px={4}
      xflex="x4"
    >
      <P>
        MIT License
      </P>
      <Span flexGrow={1} />
      <P>
        Made with ❤️ in 🇫🇮 by{' '}
        <A
          href="https://github.com/dherault"
          target="_blank"
          rel="noopener noreferrer"
        >
          David Hérault
        </A>
      </P>
    </Footer>
  )
}

export default Home
