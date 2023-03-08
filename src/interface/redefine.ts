import Taro from "@tarojs/taro"

export interface IRequestTask<T> extends Promise<T> {
  abort(): void
}

export interface IUploadTask<T> extends Promise<T> {
  abort(): void
  onProgressUpdate(
    callback: Taro.UploadTask.OnProgressUpdateCallback,
  ): void
}