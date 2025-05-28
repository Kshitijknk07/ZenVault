resource "aws_iam_user" "zenvault_uploader" {
  name = "zenvault-uploader"
}

resource "aws_iam_user_policy" "zenvault_uploader_policy" {
  name = "zenvault-uploader-policy"
  user = aws_iam_user.zenvault_uploader.name

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "s3:PutObject",
          "s3:GetObject"
        ],
        Resource = "arn:aws:s3:::${var.zenvault_bucket_name}/*"
      }
    ]
  })
}

resource "aws_iam_access_key" "zenvault_uploader_key" {
  user = aws_iam_user.zenvault_uploader.name
}
