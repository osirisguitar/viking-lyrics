# viking-lyrics

Recurrent neural network that makes viking metal/power metal lyrics.

It has listened to some of these bands:

- Amon Amarth
- Ensiferum
- Enslaved
- Grand Magus
- Rhapsody
- Unleashed
- Manowar

## How to run

### Build docker image

### Run docker image

### Exec into docker image and train

cd /root/torch-rnn
python scripts/preprocess.py --input_txt /app/lyrics/viking2.txt --output_h5 /app/viking2.h5 --output_json /app/viking2.json

th train.lua -input_h5 /app/viking2.h5 -input_json /app/viking2.json -gpu -1

