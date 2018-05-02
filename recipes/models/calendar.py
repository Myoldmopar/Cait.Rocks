from __future__ import unicode_literals

from django.db import models

from recipes.models.recipe import Recipe


class CalendarDay(models.Model):
    recipe01 = models.OneToOneField(Recipe, related_name="recipe01")
    recipe02 = models.OneToOneField(Recipe, related_name="recipe02")
    recipe03 = models.OneToOneField(Recipe, related_name="recipe03")
    recipe04 = models.OneToOneField(Recipe, related_name="recipe04")

    def __str__(self):
        return "A single calendar day instance, containing up to 4 recipes"


class Calendar(models.Model):
    nickname = models.CharField(max_length=100, help_text="A brief nickname for this month, could be just YY-MMM")
    day01 = models.OneToOneField(CalendarDay, help_text="A pointer to day #01 of this month", related_name="day01")
    day02 = models.OneToOneField(CalendarDay, help_text="A pointer to day #02 of this month", related_name="day02")
    day03 = models.OneToOneField(CalendarDay, help_text="A pointer to day #03 of this month", related_name="day03")
    day04 = models.OneToOneField(CalendarDay, help_text="A pointer to day #04 of this month", related_name="day04")
    day05 = models.OneToOneField(CalendarDay, help_text="A pointer to day #05 of this month", related_name="day05")
    day06 = models.OneToOneField(CalendarDay, help_text="A pointer to day #06 of this month", related_name="day06")
    day07 = models.OneToOneField(CalendarDay, help_text="A pointer to day #07 of this month", related_name="day07")
    day08 = models.OneToOneField(CalendarDay, help_text="A pointer to day #08 of this month", related_name="day08")
    day09 = models.OneToOneField(CalendarDay, help_text="A pointer to day #09 of this month", related_name="day09")
    day10 = models.OneToOneField(CalendarDay, help_text="A pointer to day #10 of this month", related_name="day10")
    day11 = models.OneToOneField(CalendarDay, help_text="A pointer to day #11 of this month", related_name="day11")
    day12 = models.OneToOneField(CalendarDay, help_text="A pointer to day #12 of this month", related_name="day12")
    day13 = models.OneToOneField(CalendarDay, help_text="A pointer to day #13 of this month", related_name="day13")
    day14 = models.OneToOneField(CalendarDay, help_text="A pointer to day #14 of this month", related_name="day14")
    day15 = models.OneToOneField(CalendarDay, help_text="A pointer to day #15 of this month", related_name="day15")
    day16 = models.OneToOneField(CalendarDay, help_text="A pointer to day #16 of this month", related_name="day16")
    day17 = models.OneToOneField(CalendarDay, help_text="A pointer to day #17 of this month", related_name="day17")
    day18 = models.OneToOneField(CalendarDay, help_text="A pointer to day #18 of this month", related_name="day18")
    day19 = models.OneToOneField(CalendarDay, help_text="A pointer to day #19 of this month", related_name="day19")
    day20 = models.OneToOneField(CalendarDay, help_text="A pointer to day #20 of this month", related_name="day20")
    day21 = models.OneToOneField(CalendarDay, help_text="A pointer to day #21 of this month", related_name="day21")
    day22 = models.OneToOneField(CalendarDay, help_text="A pointer to day #22 of this month", related_name="day22")
    day23 = models.OneToOneField(CalendarDay, help_text="A pointer to day #23 of this month", related_name="day23")
    day24 = models.OneToOneField(CalendarDay, help_text="A pointer to day #24 of this month", related_name="day24")
    day25 = models.OneToOneField(CalendarDay, help_text="A pointer to day #25 of this month", related_name="day25")
    day26 = models.OneToOneField(CalendarDay, help_text="A pointer to day #26 of this month", related_name="day26")
    day27 = models.OneToOneField(CalendarDay, help_text="A pointer to day #27 of this month", related_name="day27")
    day28 = models.OneToOneField(CalendarDay, help_text="A pointer to day #28 of this month", related_name="day28")
    day29 = models.OneToOneField(CalendarDay, help_text="A pointer to day #29 of this month", related_name="day29")
    day30 = models.OneToOneField(CalendarDay, help_text="A pointer to day #30 of this month", related_name="day30")
    day31 = models.OneToOneField(CalendarDay, help_text="A pointer to day #31 of this month", related_name="day31")

    def __str__(self):
        if self.nickname:
            if len(self.nickname) < 40:
                return self.nickname
            return self.nickname[:40]
        else:
            return "Unnamed calendar"
