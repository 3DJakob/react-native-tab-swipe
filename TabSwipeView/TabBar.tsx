import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'

const Bar = styled.View`
  width: 100%;
  flex-direction: row;
`

const Tab = styled.TouchableOpacity`
  padding: 14px;
  border-bottom-width: 2px;
  border-bottom-color: ${(props: { active: boolean }) => props.active ? 'black' : 'transparent'};
  flex: 1;
`

export interface TabBarProps {
  labels: string[]
  tabIndex: number
  onLabelPress: (label: string) => void
}

const TabBar: React.FC<TabBarProps> = ({ labels, tabIndex, onLabelPress }) => {
  return (
    <Bar>
      {labels.map((label, i) => (
        <Tab key={i} onPress={() => onLabelPress(label)} active={tabIndex === i}>
          <Text style={{ fontWeight: 'bold' }}>{label}</Text>
        </Tab>
      ))}
    </Bar>
  )
}

export default TabBar
