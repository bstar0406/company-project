import { Request, Response } from 'express'
import * as fs from 'fs'
import * as Path from 'path'
import Test from './test.model'
import config from '../../config/config'
import axios from 'axios'
export default class UserController {
  public api1 = async (req: Request, res: Response): Promise<any> => {
    const responseData = await this.api(config.API1, 'api1')
    return res.status(200).send(responseData)
  }

  public api2 = async (req: Request, res: Response): Promise<any> => {
    const responseData = await this.api(config.API2, 'api2')
    return res.status(200).send(responseData)
  }

  public api3 = async (req: Request, res: Response): Promise<any> => {
    const responseData = await this.api(config.API3, 'api3')
    return res.status(200).send(responseData)
  }

  public api = async (url, type): Promise<any> => {
    const data = (await axios.get(url)).data.Search
    for (let i = 0; i < data.length; i++) {
      const test = await Test.find({
        imdbID: data[i].imdbID,
        Title: data[i].Title,
        Type: data[i].Type,
        Year: data[i].Year,
      })
      if (test.length === 0) {
        let filename = 'default.png'
        if(data[i].Poster !=='N/A'){
          filename = Date.now() + '_test.png'
          const path = Path.resolve('upload', filename)
          const writer = fs.createWriteStream(path)
          try{
            const response = await axios({
              url: data[i].Poster,
              method: 'GET',
              responseType: 'stream',
            })
            response.data.pipe(writer)
            new Promise((resolve, reject) => {
              writer.on('finish', resolve)
              writer.on('error', reject)
            })
          }catch(err){
            return {
              data:[],
              success:false
            }
          }
        }
        
        let newTest = new Test({
          Title: data[i].Title,
          Type: data[i].Type,
          Year: data[i].Year,
          imdbID: data[i].imdbID,
          Poster: filename,
          api1: type === 'api1' ? true : false,
          api2: type === 'api2' ? true : false,
          api3: type === 'api3' ? true : false,
        })
        await newTest.save()
      } else {
        switch (type) {
          case 'api1':
            test[0].api1 = true
            break
          case 'api2':
            test[0].api2 = true
            break
          case 'api3':
            test[0].api3 = true
            break
          default:
            break
        }
        test[0].api3 = true
        await test[0].save()
      }
    }
    let responseData;
    switch (type) {
      case 'api1':
        responseData = await Test.find({ api1: true })
        break
      case 'api2':
        responseData = await Test.find({ api2: true })
        break
      case 'api3':
        responseData = await Test.find({ api3: true })
        break
      default:
        break
    }
    
    return {
      data:responseData,
      success:true
    }
  }
}
