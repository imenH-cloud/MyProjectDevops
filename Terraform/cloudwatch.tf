# CloudWatch Log Group pour pfe (générique)
resource "aws_cloudwatch_log_group" "pfe" {
  name              = "/pfe/app"
  retention_in_days = 30

  tags = {
    Application = "pfe"
  }
}

# CloudWatch Alarm pour CPU EC2
resource "aws_cloudwatch_metric_alarm" "pfe_cpu" {
  alarm_name          = "pfe-high-cpu"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = "120"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "Monitors EC2 CPU Utilization"
  alarm_actions       = [aws_sns_topic.pfe_alarms.arn]

  dimensions = {
    InstanceId = aws_instance.pfe.id
  }
}

# SNS Topic pour les alertes (conservé si utilisé ailleurs)
resource "aws_sns_topic" "pfe_alarms" {
  name = "pfe-alarms"
}

# CloudWatch Dashboard modifié
resource "aws_cloudwatch_dashboard" "pfe" {
  dashboard_name = "pfe-dashboard"

  dashboard_body = jsonencode({
    widgets = [
      {
        type   = "metric"
        x      = 0
        y      = 0
        width  = 12
        height = 6

        properties = {
          metrics = [
            ["AWS/EC2", "CPUUtilization", "InstanceId", aws_instance.pfe.id],
            ["AWS/RDS", "CPUUtilization", "DBInstanceIdentifier", aws_db_instance.pfe.identifier]
          ]
          period = 300
          stat   = "Average"
          region = "eu-west-3"
          title  = "Infrastructure Metrics"
        }
      }
    ]
  })
}
