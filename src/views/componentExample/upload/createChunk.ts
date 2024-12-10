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
    const spark = new SparkMD5.ArrayBuffer() // 创建sparkMD5对象
    const blob = file.slice(start, end)
    const fileReader = new FileReader() // 创建文件读取对象
    // 文件读取完成
    fileReader.onload = (e: any) => {
      spark.append(e.target.result) // 将文件内容添加到spark中
      resolve({
        start,
        end,
        index,
        hash: spark.end(),
        blob,
      })
    }
    // 分片切割
    fileReader.readAsArrayBuffer(blob)
  })
}
