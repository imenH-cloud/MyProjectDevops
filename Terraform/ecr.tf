resource "aws_ecr_repository" "pfe" {
  name = "ecr-repo"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "ecr-repo"
    Environment = "Pre-Production"
  }
}

# Politique de lifecycle pour nettoyer les images anciennes
resource "aws_ecr_lifecycle_policy" "pfe" {
  repository = aws_ecr_repository.pfe.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 30 images"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 30
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

output "repository_url" {
  value = aws_ecr_repository.pfe.repository_url
}