package main

import (
	"github.com/alexsward/advent/lib"
	"log"
	"math"
)

func main() {
	if lib.PartOne() {
		one()
		return
	}
	two()
}

func one() {
	f, scanner := lib.LoadInput("input")
	defer f.Close()

	count := 0
	ones := [12]int{}
	err := lib.ProcessLines(scanner, func(s string) error {
		count++

		for i, bit := range s {
			if int(bit-48) == 1 {
				ones[i] += 1
			}
		}
		return nil
	})
	if err != nil {
		log.Panicf("error processing lines: %s", err)
		return
	}
	gamma, epsilon := 0.0, 0.0
	for i, total := range ones {
		if total > count/2 {
			gamma += math.Pow(2.0, float64(len(ones)-i-1))
		} else {
			epsilon += math.Pow(2.0, float64(len(ones)-i-1))
		}
	}
	log.Printf("Result: %f", gamma*epsilon)
}
func two() {}