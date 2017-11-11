FROM crisbal/torch-rnn:base

RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN sudo apt-get install build-essential
RUN sudo apt-get install nodejs

COPY ./lib/ /app/lib/
COPY cv /root/torch-rnn/cv

COPY package.json /app/
COPY package-lock.json /app/

WORKDIR /app

RUN npm install --production

EXPOSE 8899

CMD node lib/index.js