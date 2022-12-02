package lib

import (
	"bufio"
	"flag"
	"log"
	"os"
)

func LoadInput(file string) (*os.File, *bufio.Scanner) {
	f, err := os.Open(file)
	if err != nil {
		log.Panicf("can't load input file %s: %s", file, err)
	}
	return f, bufio.NewScanner(f)
}

func PartOne() bool {
	part := flag.Int("part", 1, "part of the day to run")
	flag.Parse()
	return *part == 1
}
