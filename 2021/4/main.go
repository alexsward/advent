package main

import (
	"github.com/alexsward/advent/lib"
	"log"
	"strconv"
	"strings"
)

type Board struct {
	rows             [][]int
	rowHits, colHits map[int]int
	hits             [5][5]bool
}

func (b *Board) Wins(calls []int) (bool, int, int, int) {
	for step, call := range calls {
		for i, row := range b.rows {
			for j, col := range row {
				if col == call {
					b.hits[i][j] = true
					b.rowHits[i] = b.rowHits[i] + 1
					b.colHits[j] = b.colHits[j] + 1
					if b.rowHits[i] == 5 || b.colHits[j] == 5 {
						return true, step, call, b.RemainingScore()
					}
				}
			}
		}
	}
	return false, 0, 0, 0
}

func (b *Board) RemainingScore() int {
	sum := 0
	for i, row := range b.rows {
		for j, col := range row {
			if !b.hits[i][j] {
				sum += col
			}
		}
	}
	return sum
}

func main() {
	f, scanner := lib.LoadInput("input")
	defer f.Close()

	transform := func(raw string) int {
		i, err := strconv.Atoi(raw)
		if err != nil {
			log.Panicf("Couldn't parse raw number: '%s'", raw)
		}
		return i
	}

	scanner.Scan()
	numbers := lib.Map(strings.Split(scanner.Text(), ","), transform)
	log.Printf("calls: %+v", numbers)
	lines, _ := lib.LinesIntoSkip(scanner, func(raw string) ([]int, bool, error) {
		if len(raw) == 0 {
			return nil, false, nil
		}

		return lib.Map(strings.Fields(raw), transform), true, nil
	})

	call, remaining := 0, 0
	p1 := lib.PartOne()
	steps := 10000
	if !p1 {
		steps = 0
	}
	for i := 0; i < len(lines)-4; i += 5 {
		b := &Board{
			rows:    lines[i : i+5],
			hits:    [5][5]bool{},
			rowHits: map[int]int{},
			colHits: map[int]int{},
		}
		won, step, c, r := b.Wins(numbers)
		if won && ((p1 && step < steps) || (!p1 && step > steps)) {
			steps = step
			call = c
			remaining = r
		}
	}

	log.Printf("Winner: %d, call: %d, remaining: %d", call*remaining, call, remaining)
}

func two() {}
