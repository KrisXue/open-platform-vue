import { commonApi } from './api'
import axios from 'axios'

export default {
  captchaUrl () {
    return commonApi.captchaUrl()
  }
}
