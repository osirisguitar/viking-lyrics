# viking-lyrics

Recurrent neural network that makes viking metal/power metal lyrics.

It has listened to these bands:

- Amon Amarth
- Crystal Eyes
- Doomsword
- Einherjer
- Ensiferum
- Enslaved
- Eye of Odin
- Folkearth
- Grand Magus
- Lost Horizon
- Manowar
- Rhapsody
- Unleashed

(Found on http://www.darklyrics.com/)

## How to run

### Build docker image

```
docker build -t my-torch-rnn .
```

### Run docker image

```
mkdir cv

docker run --name my-torch-rnn -v `pwd`/cv:/root/torch-rnn/cv -p 8899:8899 -d my-torch-rnn
```

### Exec into docker image and train

```
docker exec -it my-torch-rnn /bin/bash

cd /root/torch-rnn

python scripts/preprocess.py --input_txt /app/lyrics/viking2.txt --output_h5 /app/viking2.h5 --output_json /app/viking2.json

th train.lua -input_h5 /app/viking2.h5 -input_json /app/viking2.json -gpu -1```