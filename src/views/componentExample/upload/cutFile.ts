/**
 * 多线程
 */
const CHUNK_SIZE = 1024 * 1024 * 3 // 5MB

// const THREAD_COUNT = navigator.hardwareConcurrency || 4 // 线程数量
const THREAD_COUNT = 4 // 线程数量

// console.log('CPU核数：', navigator.hardwareConcurrency)

export function cutFile(file: any) {
  return new Promise((resolve) => {
    const result: any = []

    const chunkCount = Math.ceil(file.size / CHUNK_SIZE) //  分片数量
    console.log('分片数量：', chunkCount)

    const workerChunkCount = Math.ceil(chunkCount / THREAD_COUNT) // 一个线程多少个分片
    console.log('一个线程多少个分片:', workerChunkCount)

    let finishCount = 0 // 线程计数器
    for (let i = 0; i < THREAD_COUNT; i++) {
      // 创建一个新的 worker 线程
      const worker = new Worker(new URL('./worker.ts', import.meta.url), {
        type: 'module',
      })
      // 计算每个线程的开始索引和结束索引
      const startIndex = i * workerChunkCount // 区间开始
      let endIndex = startIndex + workerChunkCount // 区间结束
      if (endIndex > chunkCount) endIndex = chunkCount
      // 给每一个线程传入文件，分片的大小，区间开始，区间结束
      worker.postMessage({
        file,
        CHUNK_SIZE,
        startIndex,
        endIndex,
      })
      // 接收每个线程分片结果并进行组合
      worker.onmessage = (e) => {
        for (let i = startIndex; i < endIndex; i++) {
          result[i] = e.data[i - startIndex]
        }
        worker.terminate()
        finishCount++
        if (finishCount === THREAD_COUNT) {
          // 当所有线程都分片完成后返回所有分片
          resolve(result)
        }
      }
    }
  })
}

/**
 * 单线程模式
 */
import { createChunk } from './createChunk'
export async function oneCutFile(file: any) {
  const CHUNK_SIZE = 1024 * 1024 * 5 // 5MB
  const result = []
  const chunkCount = Math.ceil(file.size / CHUNK_SIZE) //  分片数量
  console.log('分片数量：', chunkCount)
  for (let i = 0; i < chunkCount; i++) {
    const chunk = await createChunk(file, i, CHUNK_SIZE)
    result.push(chunk)
  }
  return result
}
