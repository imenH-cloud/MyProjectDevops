# Définition de la politique IAM
resource "aws_iam_policy" "custom_policy" {
  name        = "CustomTerraformPolicy"
  description = "A custom policy for Terraform operations"
  policy      = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = [
                "ecs:CreateCluster",
                "ecs:RegisterTaskDefinition",
                "ec2:CreateVpc",
                "ec2:AllocateAddress",
                "iam:CreateRole",
                "iam:CreatePolicy",
                "iam:AttachRolePolicy",
                "iam:PutRolePolicy",
                "iam:PassRole"

        ],
        Resource = "*"
      }
    ]
  })
}

# Attachement de la politique à un utilisateur IAM
resource "aws_iam_user_policy_attachment" "attach_policy_to_user" {
  policy_arn = aws_iam_policy.custom_policy.arn
  user      = "awsuser"
}
