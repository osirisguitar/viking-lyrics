FROM crisbal/torch-rnn:base

RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN sudo apt-get install build-essential
RUN sudo apt-get install -y --force-yes nodejs

COPY ./lib/ /app/lib/
COPY cv /root/torch-rnn/cv
COPY crawler/lyrics/viking2.txt /app/lyrics/
COPY package.json /app/
COPY package-lock.json /app/

WORKDIR /app

RUN npm install --production

EXPOSE 8899

CMD node lib/index.js