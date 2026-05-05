---
slug: stm32-freertos-bringup
title: 'STM32 on FreeRTOS: A Comprehensive Bring-up Guide'
date: '2026-04-15'
category: Embedded
tags: ["STM32", "RTOS", "C", "Arm Cortex"]
excerpt: 'Detailed steps on bringing up FreeRTOS on STM32 microcontrollers, dealing with interrupts, task scheduling, and avoiding priority inversion.'
---

# STM32 on FreeRTOS

When working with STM32 and FreeRTOS, memory management and interrupt priorities are the two most critical aspects.

## The Setup
Using STM32CubeMX helps, but understanding what it generates is critical. For instance, the **SysTick** interrupt priority.

### Math behind scheduling
A basic mathematical model for task shedulability in Rate Monotonic Analysis (RMA) is given by:
$$ U = \sum_{i=1}^{n} \frac{C_i}{T_i} \leq n(2^{1/n} - 1) $$

Where $C_i$ is computation time and $T_i$ is the period constraint. 

## Code snippet
Here is a basic setup for an LED blink task over RTOS:
```c
void vTaskLed(void *pvParameters) {
  for(;;) {
    HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
    vTaskDelay(pdMS_TO_TICKS(500));
  }
}
```

Remember to configure the priority grouping correctly via `NVIC_SetPriorityGrouping(0);`.
