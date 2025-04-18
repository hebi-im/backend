import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UploadService {
  private s3: S3Client
  private bucket: string

  constructor() {
    this.bucket = process.env.R2_BUCKET
    this.s3 = new S3Client({
      region: process.env.R2_REGION,
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY,
        secretAccessKey: process.env.R2_SECRET_KEY,
      },
    })
  }

  async getPresignedUploadUrl(
    filename: string,
    mimetype: string,
  ): Promise<{ uploadUrl: string; publicUrl: string }> {
    try {
      const key = `${Date.now()}-${filename}`

      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        ContentType: mimetype,
      })

      const uploadUrl = await getSignedUrl(this.s3, command, {
        expiresIn: 60 * 5,
      })

      const baseUrl = process.env.R2_PUBLIC_URL
      const publicUrl = `${baseUrl}/${key}`
      return { uploadUrl, publicUrl }
    } catch (error) {
      console.error('presigned URL generation error:', error)
      throw new Error('Failed to generate pre-signed URL')
    }
  }

  async getPresignedDownloadUrl(key: string): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      })

      const downloadUrl = await getSignedUrl(this.s3, command, {
        expiresIn: 60 * 5,
      })

      return downloadUrl
    } catch (error) {
      console.error('presigned download URL generation error:', error)
      throw new Error('Failed to generate pre-signed download URL')
    }
  }
}
