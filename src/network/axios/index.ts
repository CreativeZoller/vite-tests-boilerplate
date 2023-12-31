import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { axiosBaseOptions } from '@/network/axios/axios-setup'
import type { AxiosDownload, Upload, UrlDownload } from '@/network/axios/type'
import { UploadStream } from '@/network/axios/type'

function analysisFilename(contentDisposition: string): string {
  let regex = /filename\*=\S+?''(.+?)(;|$)/
  if (regex.test(contentDisposition)) {
    return RegExp.$1
  }
  regex = /filename="{0,1}([\S\s]+?)"{0,1}(;|$)/
  if (regex.test(contentDisposition)) {
    return RegExp.$1
  }
  return '文件名获取异常'
}

class MyAxios {
  private readonly axiosInstance: AxiosInstance
  constructor(options: AxiosRequestConfig) {
    this.axiosInstance = axios.create(options)
    this.initInterceptors()
  }

  private initInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token: string | null = localStorage.getItem('token')
        if (token) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          config.headers['authorization'] = `Bearer ${token}`
        }
        console.log(`本次请求的config信息：`, config)
        return config
      },
      (error) => {
        console.log(`axios请求拦截部分报错，错误信息error`, error)
        return Promise.reject(error)
      },
    )

    this.axiosInstance.interceptors.response.use(
      (response) => {
        const { data } = response
        console.log('data', data)
        if (data.rsCode !== 0) {
          alert(`${data.rsCause}`)
          return Promise.reject(data.data)
        }
        if (data instanceof Blob) {
          return response
        } else {
          return data.data
        }
      },
      (error: AxiosError) => {
        console.log('An error occured during Axios response - ', error)
        //import { Message } from 'element-ui';
        /*    if(error?.response){
              switch (error.response.status){
                  case 400:
                      Message.error('Request error');
                      break;
                  case 401:
                      Message.error('Unauthorized access');
                      break;
                  case 404:
                      Message.error('Resource not found');
                      break;
                  default:
                      Message.error('Other error');
              }
          }*/

        return Promise.reject(error)
      },
    )
  }

  get<T>(url: string, data?: object): Promise<T> {
    return this.axiosInstance.get(url, { params: data })
  }

  post<T>(url: string, data?: object, params?: object): Promise<T> {
    return this.axiosInstance.post(url, data, { params })
  }

  put<T>(url: string, data?: object, params?: object): Promise<T> {
    return this.axiosInstance.put(url, data, { params })
  }

  delete<T>(url: string, data?: object): Promise<T> {
    return this.axiosInstance.delete(url, { params: data })
  }

  upload<T>(data: Upload): Promise<T> {
    const { url, formData, controller, onUploadProgress } = data
    return this.axiosInstance.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress,
      signal: controller ? controller.signal : undefined,
    })
  }

  async uploadStream<T>(data: UploadStream): Promise<T> {
    const { url, file, controller, onUploadProgress } = data
    /** generateSHA SHA256 hash  crypto-js **/
    // async function generateSHA(file: File): Promise<string> {
    //   const wordArray = CryptoJs.lib.WordArray.create(await file.arrayBuffer())
    //   const sha256 = CryptoJs.SHA256(wordArray)
    //   //转16进制
    //   return sha256.toString()
    // }
    // const Hash = await generateSHA(File)
    const fileArrayBuffer = await file.arrayBuffer()
    return this.axiosInstance.post(url, fileArrayBuffer, {
      headers: { 'Content-Type': 'application/octet-stream' },
      onUploadProgress,
      signal: controller ? controller.signal : undefined,
    })
  }

  axiosDownload(params: AxiosDownload): Promise<{ fileName: string }> {
    const { url, data, controller, fileName, onDownloadProgress } = params
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get<Blob>(url, {
          params: data,
          responseType: 'blob',
          onDownloadProgress,
          signal: controller ? controller.signal : undefined,
        })
        .then((res) => {
          const blob = new Blob([res.data])
          const a = document.createElement('a')
          a.style.display = 'none'
          if (fileName) {
            a.download = fileName
          } else {
            a.download = decodeURIComponent(analysisFilename(res.headers['content-disposition']))
          }
          a.href = URL.createObjectURL(blob)
          document.body.appendChild(a)
          const downloadFileName = a.download
          a.click()
          URL.revokeObjectURL(a.href)
          document.body.removeChild(a)
          resolve({ fileName: downloadFileName })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  urlDownload(params: UrlDownload) {
    const { fileName, serveBaseUrl, fileUrl } = params
    const a = document.createElement('a')
    a.style.display = 'none'
    a.download = fileName
    a.href = serveBaseUrl ? `${serveBaseUrl}${fileUrl}` : fileUrl
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(a.href)
    document.body.removeChild(a)
  }
}

export const request = new MyAxios(axiosBaseOptions)
