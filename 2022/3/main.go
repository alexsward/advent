package main

import (
	"github.com/alexsward/advent/lib"
	"log"
)

func main() {
	if lib.PartOne() {
		one()
	} else {
		two()
	}
}

func one() {
	f, scanner := lib.LoadInput("input")
	defer f.Close()

	sum := 0
	for scanner.Scan() {
		line := scanner.Text()
		mid := len(line) / 2

		runesLeft := make(map[uint8]int)
		runesRight := make(map[uint8]int)
		for i := 0; i < mid; i++ {
			left := line[i]
			if _, ok := runesLeft[left]; !ok {
				runesLeft[left] = 1
			}

			right := line[mid+i]
			if _, ok := runesRight[right]; !ok {
				runesRight[right] = 0
			}
		}

		r, ok := lib.CommonKey(runesLeft, runesRight)
		if !ok {
			log.Fatalf("didn't find a rune with count > 1 for line: %s", line)
			return
		}
		if r <= 90 { // upper case
			sum += int(r) - 38
		} else { // lower
			sum += int(r) - 96
		}
	}

	if err := scanner.Err(); err != nil {
		log.Fatalf("error processing file: %s", err)
		return
	}
	log.Printf("Result: %d", sum)
}
func two() {
	f, scanner := lib.LoadInput("input")
	defer f.Close()

	lines, _ := lib.LinesInto(scanner, func(s string) (string, error) {
		return s, nil
	})
	sum := 0
	for i := 0; i < len(lines); i += 3 {
		r, ok := lib.CommonKey(stringToMap(lines[i]), stringToMap(lines[i+1]), stringToMap(lines[i+2]))
		if !ok {
			log.Fatalf("error finding common letter in strings: [%s, %s, %s]", lines[i], lines[i+1], lines[i+2])
		}
		if r <= 90 { // upper case
			sum += int(r) - 38
		} else { // lower
			sum += int(r) - 96
		}
	}
	log.Printf("Result: %d", sum)
}

func stringToMap(s string) map[int32]int {
	m := make(map[int32]int)
	for _, r := range s {
		if _, ok := m[r]; !ok {
			m[r] = 0
		}
		m[r] = m[r] + 1
	}
	return m
}
