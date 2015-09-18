#!/bin/bash

curl -k -d '{"name": "Leo", "score":  "2", "comment": "something"}' -H 'Content-Type: application/json' http://localhost:3000/painScores
