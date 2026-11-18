// Jenkins Pipeline başlangıcı.
pipeline {

    // Pipeline uygun bir Jenkins executor üzerinde çalışır.
    agent any

    // Jenkins'in otomatik checkout yapmasını engeller.
    options {
        skipDefaultCheckout(true)
    }

    // Pipeline genelinde kullanılacak değişkenler.
    environment {

        // Oluşturacağımız Docker image'ın adı.
        IMAGE_NAME = 'jenkins-cicd-demo'
    }

    stages {

        // ==========================================
        // STAGE 1 - CHECKOUT
        // ==========================================

        stage('Checkout') {

            steps {

                echo 'STAGE 1: GitHub kodlari aliniyor...'

                // GitHub repository'sinden kodları çeker.
                checkout scm

                // Çekilen dosyaları listeler.
                sh 'ls -la'

                echo 'STAGE 1: Checkout tamamlandi.'
            }
        }

        // ==========================================
        // STAGE 2 - BUILD
        // ==========================================

        stage('Build') {

            steps {

                echo 'STAGE 2: Docker image olusturuluyor...'

                // Docker image oluşturuyoruz.
                sh '''
                    docker build \
                      -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                '''

                // Oluşturduğumuz Docker image'ı listeliyoruz.
                sh 'docker images jenkins-cicd-demo'

                echo 'STAGE 2: Docker image basariyla olusturuldu.'
            }
        }
    }

    // Pipeline tamamlandıktan sonra çalışacak işlemler.
    post {

        success {
            echo 'PIPELINE SUCCESS: Tum stage islemleri basarili.'
        }

        failure {
            echo 'PIPELINE FAILED: Console Output loglarini kontrol edin.'
        }
    }
}