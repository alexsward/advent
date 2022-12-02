package main

import (
	"github.com/alexsward/advent/lib"
	"log"
	"sort"
	"strconv"
)

type Elf struct {
	cals []int
	sum  int
}

func main() {
	f, scanner := lib.LoadInput("input")
	defer f.Close()

	top := 3
	if lib.PartOne() {
		top = 1
	}

	elves := make([]*Elf, 0)
	elf := &Elf{
		cals: []int{},
		sum:  0,
	}
	for scanner.Scan() {
		l := scanner.Text()
		if l == "" {
			elves = append(elves, elf)
			elf = &Elf{
				cals: []int{},
				sum:  0,
			}
			continue
		}

		i, err := strconv.Atoi(l)
		if err != nil {
			log.Fatalf("Error processing line of file: '%s'", l)
		}
		elf.cals = append(elf.cals, i)
		elf.sum += i
	}
	if err := scanner.Err(); err != nil {
		log.Fatalf("Error scanning file: %s", err)
		return
	}
	sort.Slice(elves, func(i, j int) bool {
		return elves[i].sum < elves[j].sum
	})
	sum := 0
	for i := 0; i < top; i++ {
		sum += elves[len(elves)-i-1].sum
	}
	log.Printf("Total calories for number of elves: %d", sum)
}
