package main

import (
	"github.com/alexsward/advent/lib"
	"log"
	"strings"
)

type Assignment struct {
	start, end int
}

func NewAssignment(parts []string) *Assignment {
	return &Assignment{
		start: lib.AtoiUnsafe(parts[0]),
		end:   lib.AtoiUnsafe(parts[1]),
	}
}

func Overlaps(a, b *Assignment) bool {
	if a.start == b.start { // one will contain the other
		return true
	}
	if a.start < b.start { // a starts first, needs to cover other.end
		return a.end >= b.end
	}

	// a.start > other.start
	return a.end <= b.end
}

func OverlapsPartially(a, b *Assignment) bool {
	if a.start <= b.start { // a is less, so it has to extend into b's start
		return a.end >= b.start
	}

	// a.start is after b
	return a.start <= b.end
}

func main() {
	f, scanner := lib.LoadInput("input")
	defer f.Close()

	overlapper := Overlaps
	if !lib.PartOne() {
		overlapper = OverlapsPartially
	}

	overlaps := 0
	for scanner.Scan() {
		parts := strings.Split(scanner.Text(), ",")
		left := NewAssignment(strings.Split(parts[0], "-"))
		right := NewAssignment(strings.Split(parts[1], "-"))
		if overlapper(left, right) {
			overlaps++
		}
	}
	if err := scanner.Err(); err != nil {
		log.Fatalf("error processing input: %s", err)
	}
	log.Printf("Overlaps: %d", overlaps)
}
