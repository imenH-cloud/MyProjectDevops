resource "aws_db_subnet_group" "pfe" {
  name       = "pfe-db-subnet-group"
  subnet_ids = [
    aws_subnet.private-subnet-1.id,
    aws_subnet.private-subnet-2.id,
    aws_subnet.private-subnet-3.id,
    aws_subnet.private-subnet-4.id
  ]

  tags = {
    Name = "pfe DB Subnet Group"
  }
}

resource "aws_db_instance" "pfe" {
  identifier              = "pfe-db"
  engine                  = "postgres"
  engine_version          = "15.13"  
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  max_allocated_storage   = 100
  storage_type            = "gp2"
  db_name                 = "education"  
  username                = "postgres"   
  password                = "postgres"   
  db_subnet_group_name    = aws_db_subnet_group.pfe.name
  vpc_security_group_ids  = [aws_security_group.rds.id]
  skip_final_snapshot     = true
  multi_az                = false
  publicly_accessible     = false
  backup_retention_period = 7
  apply_immediately       = true
  port                    = 5432

  maintenance_window      = "sun:03:00-sun:04:00"
  backup_window           = "01:00-02:00"
  deletion_protection     = false

  tags = {
    Name = "pfe-db"
    Env  = "Pre-Production"
  }
}
