resource "aws_instance" "pfe" {
  ami           = "ami-04a20f4b19f8a7a88" 
  instance_type = "t3.medium"
  key_name      = "imen_key"

  tags = {
    Name = "pfe_app"
  }

  network_interface {
    device_index         = 0
    network_interface_id = aws_network_interface.pfe.id
  }

  user_data = <<-EOF
              #!/bin/bash
              echo "Hello, World!" > index.html
              nohup busybox httpd -f -p 80 &
              EOF
}

resource "aws_network_interface" "pfe" {
  subnet_id       = aws_subnet.public-subnet-1.id
  security_groups = [aws_security_group.pfe.id]

  tags = {
    Name = "pfe-network-interface"
  }
}

output "ec2_instance_id" {
  value = aws_instance.pfe.id
}

output "ec2_public_ip" {
  value = aws_instance.pfe.public_ip
}
