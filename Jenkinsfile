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

        // ==========================================
        // STAGE 3 - TEST
        // ==========================================

        stage('Test') {

            steps {

                echo 'STAGE 3: Testler calistiriliyor...'

                // Testler için ayrı bir Docker image oluşturuyoruz.
                sh '''
                    docker build \
                    -f Dockerfile.test \
                    -t jenkins-cicd-demo-test:${BUILD_NUMBER} .
                '''

                // Oluşturduğumuz test image'ını çalıştırıyoruz.
                sh '''
                    docker run --rm \
                    jenkins-cicd-demo-test:${BUILD_NUMBER}
                '''

                echo 'STAGE 3: Testler basariyla tamamlandi.'
            }
        }

        // ==========================================
        // STAGE 4 - DEPLOY
        // ==========================================

        stage('Deploy') {

            steps {

                echo 'STAGE 4: Deployment basliyor...'

                // Önceden oluşturulmuş container varsa kaldırıyoruz.
                sh '''
                    docker rm -f jenkins-demo-app || true
                '''

                // Build Stage'inde oluşturduğumuz image'ı kullanıyoruz.
                sh '''
                    docker run -d \
                    --name jenkins-demo-app \
                    -p 3000:3000 \
                    --restart unless-stopped \
                    jenkins-cicd-demo:${BUILD_NUMBER}
                '''

                // Uygulamanın başlaması için bekliyoruz.
                sh 'sleep 5'

                // Uygulamanın sağlıklı çalıştığını kontrol ediyoruz.
                sh '''
                    docker exec jenkins-demo-app \
                    node -e "fetch('http://127.0.0.1:3000/health').then(r => { if (!r.ok) process.exit(1); return r.json(); }).then(d => { console.log(d); if (d.status !== 'UP') process.exit(1); }).catch(() => process.exit(1))"
                '''

                echo 'STAGE 4: Deployment basariyla tamamlandi.'
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