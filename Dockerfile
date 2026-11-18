# Node.js 22 Alpine imajını kullanıyoruz.
FROM node:22-alpine

# Container içerisindeki çalışma dizinini belirliyoruz.
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyalıyoruz.
COPY package*.json ./

# Uygulamanın bağımlılıklarını yüklüyoruz.
RUN npm ci --omit=dev

# Uygulama dosyamızı container içerisine kopyalıyoruz.
COPY app.js .

# Uygulamamız 3000 portunu kullanacak.
EXPOSE 3000

# Container başladığında uygulamamızı çalıştırıyoruz.
CMD ["node", "app.js"]