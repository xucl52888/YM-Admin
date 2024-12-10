import SparkMD5 from 'spark-md5'
/**
 * 分片函数
 * @param file
 * @param index
 * @param chunkSize
 */
export function createChunk(file: { slice: (arg0: number, arg1: any) => Blob }, index: number, chunkSize: number) {
  return new Promise((resolve) => {
    // 计算分片区间
    const start = index * chunkSize
    const end = start + chunkSize
    // 创建hash
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()
    fileReader.onload = (e: any) => {
      spark.append(e.target.result)
      resolve({
        start,
        end,
        index,
        hash: spark.end(),
      })
    }
    // 分片切割
    fileReader.readAsArrayBuffer(file.slice(start, end))
  })
}
