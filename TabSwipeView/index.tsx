import React, { useEffect } from 'react'
import { LayoutChangeEvent, ScrollView, View } from 'react-native'
import styled from 'styled-components/native'
import TabBar from './TabBar'

const Page = styled.View`
  width: ${({ width }: { width: number }) => width}px;
`

export interface TabSwipeViewProps {
  children: React.ReactNode[]
  labels: string[]
  tabIndex: number
  onTabChange: (index: number) => void
}

const TabSwipeView: React.FC<TabSwipeViewProps> = ({ children, labels, tabIndex, onTabChange }) => {
  const [width, setWidth] = React.useState(0)
  const scrollRef = React.useRef<ScrollView>(null)

  const handleLayout = (event: LayoutChangeEvent): void => {
    const { width } = event.nativeEvent.layout
    setWidth(width)
  }

  const handleEndScroll = (event: { nativeEvent: { contentOffset: { x: number } } }): void => {
    const { x } = event.nativeEvent.contentOffset
    const index = Math.round(x / width)
    onTabChange(index)
  }

  useEffect(() => {
    if (scrollRef.current != null) {
      scrollRef.current.scrollTo({ x: width * tabIndex })
    }
  }, [tabIndex])

  return (
    <View onLayout={handleLayout} style={{ width: '100%' }}>
      <TabBar labels={labels} tabIndex={tabIndex} onLabelPress={(label) => onTabChange(labels.indexOf(label))} />

      {width === 0 && (
        children[0]
      )}

      {width > 0 && (
        <ScrollView onMomentumScrollEnd={(e) => handleEndScroll(e)} ref={scrollRef} style={{ width: '100%' }} pagingEnabled horizontal showsHorizontalScrollIndicator={false}>
          {children.map((child, index) => (
            <Page key={index} width={width}>
              {child}
            </Page>
          ))}
        </ScrollView>
      )}
    </View>
  )
}

export default TabSwipeView
