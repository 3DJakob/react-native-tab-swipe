import React from 'react'
import { StyleProp, Text, ViewStyle } from 'react-native'
import styled from 'styled-components/native'

const Bar = styled.View`
  width: 100%;
  flex-direction: row;
`

const Tab = styled.TouchableOpacity`
  padding: 6px 0;
  flex: 1;
`

const Pusher = styled.View`
  height: 0px;
`

const Indicator = styled.View`
  height: 2px;
  background-color: ${(props: { color: string, width: string }) => props.color};
  width: ${({ width }) => width};
  border-radius: 1px;
`

const Column = styled.View`
  flex-direction: column;
`
const Row = styled.View`
  flex-direction: row;
  background-color: ;
`
export interface TabBarProps {
  labels: string[]
  tabIndex: number
  onLabelPress: (label: string) => void
  highlightColor: string
  textColor: string
  indicatorStyle?: StyleProp<ViewStyle>
  barStyle?: StyleProp<ViewStyle>
}

const TabBar: React.FC<TabBarProps> = ({ labels, tabIndex, onLabelPress, highlightColor, textColor, indicatorStyle, barStyle }) => {
  return (
    <Column>
      <Bar>
        {labels.map((label, i) => {
          const active = Math.round(tabIndex) === i
          return (
            <Tab key={i} onPress={() => onLabelPress(label)}>
              <Text numberOfLines={1} style={{ fontWeight: 'bold', textAlign: 'center', color: active ? highlightColor : textColor }}>{label}</Text>
            </Tab>
          )
        })}
      </Bar>
      <Row style={barStyle}>
        <Pusher style={{ width: String(tabIndex * 100 / labels.length) + '%' }} />
        <Indicator style={indicatorStyle} width={String(100 / labels.length) + '%'} color={highlightColor} />
      </Row>
    </Column>
  )
}

export default TabBar
