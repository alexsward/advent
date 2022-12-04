package main

import (
	"github.com/alexsward/advent/lib"
	"log"
	"strings"
)

type Line struct {
	x1, y1 int
	x2, y2 int
	slope  float64
	b      float64
}

func (l *Line) Contains(x, y int) bool {
	return float64(y) == (l.slope*float64(x))+l.b
}

func NewLine(x1, y1, x2, y2 int) *Line {
	slope := float64((y2 - y1) / (x2 - x1))
	b := float64(y1) - (slope * float64(x1))
	return &Line{x1, y1, x2, y2, slope, b}
}

func main() {
	f, scanner := lib.LoadInput("input")
	defer f.Close()
	lines, err := lib.LinesInto(scanner, func(s string) (*Line, error) {
		points := strings.Split(s, " -> ")
		one := strings.Split(points[0], ",")
		two := strings.Split(points[1], ",")
		return NewLine(lib.AtoiUnsafe(one[0]), lib.AtoiUnsafe(one[1]), lib.AtoiUnsafe(two[0]), lib.AtoiUnsafe(two[1])), nil
	})
	if err != nil {
		log.Panicf("error parsing input into lines: %s", err)
	}
	log.Printf("Got lines: %+v", lines)
}
