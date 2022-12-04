package main

import (
	"github.com/alexsward/advent/lib"
	"log"
	"strconv"
)

func main() {
	if lib.PartOne() {
		one()
		return
	}

	f, scanner := lib.LoadInput("input")
	defer f.Close()
	depths, err := lib.LinesInto(scanner, func(s string) (int, error) {
		return strconv.Atoi(s)
	})
	if err != nil {
		log.Fatalf("Error parsing input lines: %s", err)
		return
	}
	increases := -1
	prev := 0
	for i := 0; i < len(depths)-2; i++ {
		next := depths[i] + depths[i+1] + depths[i+2]
		if next > prev {
			increases++
		}
		prev = next
	}
	log.Printf("Total changes of groups of 3: %d", increases)
}

func one() {
	f, scanner := lib.LoadInput("input")
	defer f.Close()

	prev := 0
	increases := -1 // hack?
	for scanner.Scan() {
		next, err := strconv.Atoi(scanner.Text())
		if err != nil {
			log.Fatalf("error converting line of file to int: %s", err)
			return
		}
		if next > prev {
			increases++
		}
		prev = next
	}
	if err := scanner.Err(); err != nil {
		log.Fatalf("error scanning file: %s", err)
		return
	}
	log.Printf("Total increases: %d", increases)
}
