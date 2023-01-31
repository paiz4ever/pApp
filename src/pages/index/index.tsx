import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import { APP_NAME } from '@/config'
import './index.scss'

export default class Index extends Component<PropsWithChildren> {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <Text>{APP_NAME}</Text>
      </View>
    )
  }
}
