import fs from 'fs'

export default class BigpipeController {
  // 响应头：Transfer-Encoding: chunked
  async actionBigpipe1(ctx, next) {
    function task1() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('<script>load("#section-banner", "task1")</script>')
        }, 1000)
      })
    }
    function task2() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('<script>load("#section-content", "task2")</script>')
        }, 1000)
      })
    }
    const html = fs.readFileSync('./bigpipe-test.html') // bigpipe测试文件与dist目录同级
    ctx.type = 'html'
    ctx.status = 200
    ctx.res.write(html)
    const task1Content = await task1()
    ctx.res.write(task1Content)
    const task2Content = await task2()
    ctx.res.write(task2Content)
    ctx.res.end()
  }

  // 基于流的 pipe  实现 bigpipe
  async actionBigpipe2(ctx, next) {
    ctx.type = 'html'
    ctx.status = 200
    function createSSRStreamPromise() {
      return new Promise(() => {
        const stream = fs.createReadStream('./bigpipe-test.html')
        stream.pipe(ctx.res)
      })
    }
    await createSSRStreamPromise()
  }

  // 基于流的事件实现 bigpipe
  async actionBigpipe3(ctx, next) {
    ctx.type = 'html'
    ctx.status = 200
    function createSSRStreamPromise() {
      return new Promise((resolve, reject) => {
        const stream = fs.createReadStream('./bigpipe-test.html')
        stream.on('data', (chunk) => {
          ctx.res.write(chunk)
        })
        stream.on('error', (err) => {
          reject(err)
        })
        stream.on('end', () => {
          ctx.res.end()
        })
      })
    }
    await createSSRStreamPromise()
  }
}