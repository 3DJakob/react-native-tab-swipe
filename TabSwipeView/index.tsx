import React, { useEffect } from 'react'
import { LayoutChangeEvent, ScrollView, StyleProp, View, ViewStyle } from 'react-native'
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
  style?: StyleProp<ViewStyle>
  highlightColor?: string
  textColor?: string
  indicatorStyle?: StyleProp<ViewStyle>
  barStyle?: StyleProp<ViewStyle>
}

const TabSwipeView: React.FC<TabSwipeViewProps> = ({ children, labels, tabIndex, onTabChange, style, highlightColor = 'blue', textColor = 'black', indicatorStyle, barStyle }) => {
  const [width, setWidth] = React.useState(0)
  const scrollRef = React.useRef<ScrollView>(null)

  const [currentTabIndex, setCurrentTabIndex] = React.useState(tabIndex)

  const handleLayout = (event: LayoutChangeEvent): void => {
    const { width } = event.nativeEvent.layout
    setWidth(width)
  }

  const handleEndScroll = (event: { nativeEvent: { contentOffset: { x: number } } }): void => {
    const { x } = event.nativeEvent.contentOffset
    const index = x / width
    setCurrentTabIndex(index)
    onTabChange(index)
  }

  useEffect(() => {
    if (currentTabIndex === tabIndex) return
    if (scrollRef.current != null) {
      scrollRef.current.scrollTo({ x: width * tabIndex })
    }
  }, [tabIndex])

  return (
    <View onLayout={handleLayout} style={[style, { width: '100%' }]}>
      <TabBar
        labels={labels}
        tabIndex={currentTabIndex}
        onLabelPress={(label) => onTabChange(labels.indexOf(label))}
        textColor={textColor}
        highlightColor={highlightColor}
        indicatorStyle={indicatorStyle}
        barStyle={barStyle}
      />

      {width === 0 && (
        children[0]
      )}

      {width > 0 && (
        <ScrollView
          scrollEventThrottle={1}
          onScroll={(e) => handleEndScroll(e)}
          ref={scrollRef}
          style={{ width: '100%' }}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
        >
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
